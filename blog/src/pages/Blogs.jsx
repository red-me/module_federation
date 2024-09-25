import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPosts, createPost, updatePost, deletePost, logout } from "../services/api";
import { format } from 'date-fns'
import Card from "../components/Card";
import Modal from "../components/Modal";
import DeleteIcon from '../assets/delete-icon.svg'
import EditIcon from '../assets/edit-icon.svg'
import PreviewIcon from '../assets/eye-icon.svg'

export default function Blogs() {
  const queryClient = useQueryClient()
  const [isLogout, setIsLogout] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isPreviewOpen, setPreviewOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [created, setCreated] = useState(new Date())
  const [isSaving, setIsSaving] = useState(false)
  const [postId, setPostId] = useState(0)

  const { data: datas, isLoading }= useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['articles'],
  }) 

  const { mutateAsync: createPostMutation } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
    }
  })
  
  const { mutateAsync: updatePostMutation } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
    }
  })
  
  const { mutateAsync: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
    }
  })

  const { mutateAsync: logoutMutation } = useMutation({
    mutationFn: logout,
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openPreview = () => setPreviewOpen(true);
  const closePreview = () => setPreviewOpen(false);

  const handleCreatePost = async () => {
    setPostId(0)
    setTitle('')
    setDescription('')
    openModal()
  }
  const handleSavePost = async () => {
    setIsSaving(true)
    try {
      if (postId) {
        await updatePostMutation({ id: postId, title, description })
      } else {
        await createPostMutation({ title, description })
      }
      setTitle('')
      setDescription('')
      setIsSaving(false)
      closeModal()
    } catch (e) {
      console.error(e)
      setIsSaving(false)
    }
  }

  const handleDeletePost = async (id) => {
    setIsSaving(true)
    try {
      await deletePostMutation({ id })
      setIsSaving(false)
    } catch (e) {
      console.error(e)
    }
  }
  
  const handleEditPost = async (data) => {
    setPostId(data.id)
    setTitle(data.title)
    setDescription(data.description)
    openModal()
  }

  const handleLogout = async () => {
    setIsLogout(true)
    const data = await logoutMutation()
    if (data.error) {
        setIsLogout(false)
        return
    }
    setIsLogout(false)
    window.location.href = '/'
  }

  const handlePreview = (data) => {
    setTitle(data.title)
    setDescription(data.description)
    setCreated(data.created_at)
    openPreview()
  }
  return (
    <div className="flex w-full justify-center items-center flex-col p-4 gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-2xl">Blog Post</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
            onClick={handleCreatePost}
          >
              Create
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
          disabled={isLogout}
        >
            {isLogout ? "Loading..." : 'Logout'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 w-full">
        { datas?.map((data) => (
          <Card key={data?.id} data={data}>
            <div className="absolute top-4 right-4 flex gap-3">
              <button onClick={() => handleDeletePost(data?.id)} disabled={isSaving}>
                <DeleteIcon className="w-6 h-6" />
              </button>
              <button onClick={() => handleEditPost(data)}>
                <EditIcon className="w-6 h-6" />
              </button>
              <button onClick={() => handlePreview(data)}>
                <PreviewIcon className="w-6 h-6" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold">Create a new blog</h2>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="title">Title</label>
            <input
              className="bg-neutral-100 xl:bg-transparent text-sm xl:text-base h-10 w-full border border-neutral-100 xl:border-neutral-200 shadow-xsmall rounded-md placeholder-neutral-600 px-3"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="description">Description</label>
            <textarea
              className="bg-neutral-100 xl:bg-transparent text-sm xl:text-base h-36 w-full border border-neutral-100 xl:border-neutral-200 shadow-xsmall rounded-md placeholder-neutral-600 px-3 py-2"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
            onClick={handleSavePost}
          >
              { isSaving ? `${ postId ? "Updating..." : "Saving..."}` : `${ postId ? "Update" : "Save"}` }
          </button>
        </div>
      </Modal>
      <Modal isOpen={isPreviewOpen} onClose={closePreview} className="w-full">
        <div className="w-full p-4 px-3">
          <h2 className="text-2xl font-semibold capitalize">{ title }</h2>
          <p className="text-sm text-gray-500">Date created { format(new Date(created), 'MMM dd, yyyy') }</p>
          <div className="pt-4 whitespace-pre-line max-h-[22.5rem] overflow-auto">{ description }</div>
        </div>
      </Modal>
    </div>
  );
}
