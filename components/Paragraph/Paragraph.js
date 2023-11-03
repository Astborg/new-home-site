export const Paragraph = (textAlign, content, textColor) => {
    return <p className="max-w-5xl mx-auto" dangerouslySetInnerHTML={{__html: content}}></p>
}