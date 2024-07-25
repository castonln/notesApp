import { FC } from "react";
import parse from 'html-react-parser';
import DOMPurify from "dompurify";

const htmlFrom = (htmlString: string) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString,
      { USE_PROFILES: { html: true } });
    const html = parse(cleanHtmlString);
    return html;
} // thx, Hans (https://stackoverflow.com/questions/44643424/how-to-parse-html-to-react-component)

const ParseText: FC<{ text: string }> = ({ text }) => {
    return (
        <div>
            {htmlFrom(text)}
        </div>
    );
}

export default ParseText;