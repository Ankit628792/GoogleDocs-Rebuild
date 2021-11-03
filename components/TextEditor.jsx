import dynamic from 'next/dynamic'
import { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import db from '../firebase';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor), { ssr: false });
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

function TextEditor({ email, id, snapshot }) {
    const [editorState, setEditorState] = useState(snapshot ? EditorState.createWithContent(convertFromRaw({...snapshot})) : EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        db.collection('userDocs').doc(email).collection('docs').doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true
        })
    }

    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
                editorClassName="mt-6 bg-white shadow-lg max-w-4xl mx-auto mb-12 border p-10 min-h-[700px]"
            />
        </div>
    )
}

export default TextEditor
