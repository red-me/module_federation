const express = require('express')
var router = express.Router()
const { createClient } = require('@supabase/supabase-js')


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res)=>{
	res.send({
		version: "v1"
	})
})

router.get('/check-session', async (req, res)=>{
	const { data } = await supabase.auth.getSession()
	if (data.session === null) {
		res.status(500).json({ message: 'Error retrieving data' });
	} else {
		res.send(data);
	}
})

router.post('/signin', async (req, res) => {
  const { data, error } = await supabase.auth.signInWithPassword({
		email: req.body.email,
		password: req.body.password
	})
	if (error) {
		res.status(500).json(error);
	} else {
		res.send(data);
	}
})

router.get('/signout', async (req, res)=>{
	const { data, error } = await supabase.auth.signOut()
	if (error) {
		res.status(500).json({ message: 'Error signing out' });
	} else {
		res.send(data);
	}
})

router.get('/articles', async (req, res)=>{
	const { data, error } = await supabase
		.from('article')
		.select('*')
    .order('created_at', { ascending: false });
	if (error) {
		res.status(500).json({ message: 'Error retrieving data' });
	} else {
		res.send(data);
	}
})

router.post('/create-article', async (req, res) => {
  const postdata = {
    title: req.body.title,
    description: req.body.description
  }
  const { data, error } = await supabase.from('article').upsert(postdata).select()
	if (error) {
		res.status(500).json({ message: 'Error inserting data' });
	} else {
		res.send(data);
	}
})

router.post('/update-article', async (req, res) => {
	const { data, error } = await supabase
		.from('article')
    .update({ title: req.body.title, description: req.body.description })
		.eq('id', req.body.id)
		.select();
	if (error) {
		res.status(500).json({ message: 'Error retrieving data' });
	} else {
		res.send(data);
	}
})

router.post('/delete-article', async (req, res) => {
  const { data, error } = await supabase.from('article').delete().eq('id', req.body.id)
	if (error) {
		res.status(500).json({ message: 'Error deleting data' });
	} else {
		res.send(data);
	}
})


module.exports = router
