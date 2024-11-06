"use client"

import { useState } from "react";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });
    const { data: session } = useSession();

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    ...post,
                    userId: session?.user.id
                })
            })

            if (res.ok) {
                router.push("/")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt