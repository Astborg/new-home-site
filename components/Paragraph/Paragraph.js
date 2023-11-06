import { getTextAlign } from "utils/fonts"
import { relativeToAbsoluteUrl } from "utils/relativeToAbsoluteUrls"

export const Paragraph = ({textAlign, content, textColor}) => {
const data = content
   return <p
className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
style={{color: textColor}}
dangerouslySetInnerHTML={{__html: relativeToAbsoluteUrl(data)}}></p>
}