import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextEditorProps {
    onChange: (...event: any[]) => void;
    content: string | undefined,
    selected: string | undefined;
}

const RichTextEditor = ({ onChange, content, selected }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        editorProps: {
            attributes: {
                class: 'form-control',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return (
        <>
            <EditorContent editor={editor} />
            {/*<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>*/}
        </>
    );
}

export default RichTextEditor;
