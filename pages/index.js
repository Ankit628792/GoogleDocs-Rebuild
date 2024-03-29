import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/client'
import Login from '../components/Login'
import { useState } from 'react'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import db from '../firebase'
import firebase from 'firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/DocumentRow'
import Router from 'next/router'

export default function Home() {
  const [session] = useSession();
  if (!session) return <Login />

  const [newDoc, setNewDoc] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc'))

  const createDocument = async () => {
    if (!input || input.toString().trim() === "") return;
    const res = await db.collection('userDocs').doc(session.user.email).collection('docs').add({ fileName: input, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
    const document = await db.collection('userDocs').doc(session.user.email).collection('docs').doc(res.id).get()
    setNewDoc({
      id: res.id, fileName: document.data().fileName, date: document.data().timestamp
    })
    setInput('')
    setShowModal(false)
    Router.push(`/doc/${res.id}`)
  }

  const deleteDocument = (id) => {
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id).delete();
    location.reload()
  }

  const modal = (
    <Modal size="md" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input type="text" required minLength="1" onChange={(e) => setInput(e.target.value)} value={input} className="outline-none w-full text-lg" placeholder="Enter document name..." onKeyDown={(e) => e.key === 'Enter' && createDocument()} />
      </ModalBody>
      <ModalFooter>
        <Button color="blue" className="text-base" buttonType="link" onClick={(e) => setShowModal(false)} ripple="dark">Cancel</Button>
        <Button color="blue" className="text-base" onClick={createDocument} ripple="light">Create</Button>
      </ModalFooter>
    </Modal>
  )
  return (
    <main>
      <Head>
        <title>Google Docs Rebuild</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
      {modal}
      <style global jsx>{`
      main {
        font-family: 'Roboto', sans-serif;
      }
       *::-webkit-scrollbar {
        display: none;
      }
      `}</style>

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button color="gray" buttonType="outline" rounded={true} iconOnly={true} ripple="dark" className="hidden md:inline-flex h-20 w-20 border-none">
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-500" onClick={() => setShowModal(true)}>
              <Image src="/assets/plus.png" alt='' layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-medium text-base text-gray-700">Blank</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-gray-700 text-base">
          <div className="flex items-center justify-between pb-5 px-4">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-5">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>

          {newDoc && <DocumentRow key={newDoc.id} id={newDoc.id} fileName={newDoc.fileName} date={newDoc.date} onDelete={deleteDocument} />}
          {snapshot?.docs.map(doc => (
            <DocumentRow key={doc.id} id={doc.id} fileName={doc.data().fileName} date={doc.data().timestamp} onDelete={deleteDocument} />
          ))}
        </div>
      </section>
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}
