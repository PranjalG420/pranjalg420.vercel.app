import React, { useState } from "react";
import Container from "../components/container";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Guestbook() {
    const [guestbookentry, setGuestbookentry] = useState("");
    const router = useRouter();

    const handleSend = async () => {
        try {
            console.log("Success");
            await fetch("/api/guestbook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    guestbookentry: guestbookentry,
                    name: session.user.name,
                }),
            });
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const { data: session } = useSession();
    return (
        <Container top="flex-0">
            <p className="text-2xl mb-4 tablet:text-4xl font-semibold">
                Guestbook
            </p>
            {(session && (
                <div className="flex items-start flex-col tablet:w-[900px] bg-zinc-800 p-4 rounded-xl">
                    <p className="text-lg tablet:text-xl font-semibold">
                        Leave a cool message for future viewers!
                    </p>
                    <form onSubmit={handleSend}>
                        <textarea
                            className="mt-2 w-full p-2 font-semibold text-zinc-400 rounded-lg resize-none"
                            placeholder="Enter your message here..."
                            maxLength={100}
                            rows={1}
                            onChange={(e) => {
                                setGuestbookentry(e.target.value);
                            }}
                        ></textarea>
                        <button
                            type="submit"
                            className="my-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800 text-lg tablet:text-xl transition-all tablet:hover:ml-2"
                        >
                            Submit
                        </button>
                    </form>
                    <p className="italic text-base text-zinc-500">
                        Only your name will be shown.
                    </p>
                </div>
            )) || (
                <div className="flex items-start flex-col tablet:w-[900px] bg-zinc-800 p-4 rounded-xl">
                    <p className="font-semibold text-xl tablet:text-2xl">
                        Sign in to use the Guestbook.
                    </p>
                    <p className="my-2 text-base tablet:text-lg">
                        And leave a cool message for future viewers!
                    </p>
                    <button
                        onClick={() => signIn()}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800 text-lg tablet:text-xl transition-all tablet:hover:ml-2"
                    >
                        Sign In
                    </button>
                    <p className="mt-2 italic text-base text-zinc-500">
                        Only your name will be shown.
                    </p>
                </div>
            )}
        </Container>
    );
}
