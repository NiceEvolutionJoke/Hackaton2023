import React, {
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
} from 'react';
import { useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import PatternPopup from '../view/popups/PatternPopup/PatternPopup';
import Button from '../view/UI/button/Button';
import Input from '../view/UI/Input/Input';
import postService from '../Model/postService';
import { API_URL } from '../Model/api/axios';
import Post from '../view/UI/Post/Post';
import classes from './main.module.scss';
import Header from '../view/Header/Header';
import FirstScreen from '../view/FirstScreen/FirstScreen';

export const Main = () => {
    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState(null);
    const [title, setTitle] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [posts, setPosts] = useState([]);

    const editorRef = useRef(null);

    const handleButtonClick = () => {
        console.log(content);
    };
    const handleChange = (content) => {
        console.log(content);
        setPostContent(content);
    };
    const getPosts = async () => {
        try {
            const response = await postService.getPosts();
            console.log(response.data);
            setPosts(response.data);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <>
            {/*   <button type='button' onClick={()=>setOpen(true)}>open</button>
    {open && <PatternPopup setOpen={setOpen} open={open}>
      <h1>Create new Article</h1>
      <Input value={title} onChange={setTitle} placeholder='Заголовок статьи'/>
      <Input value={subtitle} onChange={setSubtitle} placeholder='Подзаголовок статьи'/>
      <SunEditor
       width="100%" 
       height="400px" 
       onChange={handleChange}
        setOptions={{
          resizingBar : false,
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video", "audio"],
            ["imageGallery"],
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["save", "template"]
          ],
        }}/>
        <Button onClick={handleButtonClick}>Отправить</Button>
    </PatternPopup>} */}
            <Header />
            <FirstScreen />
            <div className="_container">
                <div className={classes.items}>
                    {posts?.posts?.length > 0 &&
                        posts.posts.map((post) => {
                            return <Post post={post} key={post.id} />;
                        })}
                </div>
            </div>
        </>
    );
};
