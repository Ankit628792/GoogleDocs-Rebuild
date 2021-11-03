import Head from "next/head"
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { signOut, getSession, useSession } from 'next-auth/client'
import Login from '../../components/Login'
import db from '../../firebase'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { useRouter } from "next/dist/client/router"
import TextEditor from '../../components/TextEditor'

function Doc() {
    const [session] = useSession();
    if (!session) return <Login />
    const router = useRouter();
    const [snapshot, loadingSnapshot] = useDocumentOnce(db.collection('userDocs').doc(session?.user?.email).collection('docs').doc(router.query.id))
    if (!loadingSnapshot && !snapshot?.data()?.fileName) {
        router.replace('/')
    }

    return (
        <div>
            <Head>
                <title>Document | {snapshot?.data()?.fileName} </title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <style global jsx>{`
                *::-webkit-scrollbar {
                    display: none;
                    }
            `}</style>
            <header className="flex items-center justify-between p-3 px-5 pb-1">
                <span onClick={() => router.push('/')} className="cursor-pointer"> <Icon name="description" size="5xl" color="blue" /></span>

                <div className="flex-grow px-2">
                    <h2 className="text-lg">{snapshot?.data()?.fileName}</h2>
                    <div className="flex flex-wrap items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                        <p className=" cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">File</p>
                        <p className=" cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Edit</p>
                        <p className=" cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">View</p>
                        <p className=" cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Insert</p>
                        <p className=" cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Format</p>
                        <p className=" cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Tools</p>
                    </div>
                </div>

                <Button color="lightBlue" buttonType="filled" size="regular" className="hidden md:inline-flex h-10" rounded={false} block={false} iconOnly={false} ripple="light">
                    <Icon name="people" size="md" />Share
                </Button>
                <img onClick={signOut} loading="lazy" src={session?.user?.image} alt="" className="h-10 w-10 cursor-pointer rounded-full ml-2" />
            </header>
            {snapshot?.data() && <TextEditor email={session?.user?.email} id={router.query.id} snapshot={snapshot?.data().editorState} />}
        </div>
    )
}

export default Doc

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session
        }
    }
}

