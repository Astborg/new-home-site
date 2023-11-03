import { Paragraph } from 'components/Paragraph'
import { Cover } from '../Cover'
import {Heading} from 'components/Heading'
import { theme } from 'theme'


export const BlockRenderer = ({blocks}) => {

    return blocks.map((block) => {
        switch (block.name) {
            case 'core/paragraph': {
                return <Paragraph 
                key={block.id}
                textAlign={block.attributes.align}
                content={block.attributes.content}
                textColor={theme[block.attributes.textColor] ||
                block.attributes.style?.text?.color}
                ></Paragraph>
            }
            case 'core/heading': {
                return <Heading key={block.id} 
                textAlign={block.attributes.textAlign}
                level={block.attributes.level}
                content={block.attributes.content}></Heading>
            }
            case 'core/cover':{
                console.log(block)
                return <Cover key={block.id} background={block.attributes.url}>
                    <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
                </Cover>
            }
            default:
                return null
        }
    })
}