import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function TextEditor({value, setValue}){
    return <ReactQuill theme="snow" value={value} onChange={setValue} className="custom-editor" />;
}
