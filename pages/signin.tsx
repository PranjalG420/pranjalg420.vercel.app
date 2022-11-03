import React from "react";
import Container from "../components/container";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "../components/smallcomponents";
import Head from "next/head";

export default function signin() {
    return (
        <Container top="flex-1">
            <Head>
                <title>Sign In</title>
            </Head>
            <div key="GitHub" className="flex flex-col items-center mx-auto">
                <p className="text-2xl mb-4 tablet:text-4xl font-semibold">
                    Sign in with GitHub
                </p>
                <Button button_function={() => signIn("github")}>
                    Sign In
                </Button>
            </div>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}
