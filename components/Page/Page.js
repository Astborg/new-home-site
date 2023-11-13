import { BlockRenderer } from "components/BlockRenderer"
import { MainMenu } from "components/MainMenu"

export const Page = (props) => {
    return (<div>
        <MainMenu items={props.mainMenuItems}
    callToActionDestination={props.callToActionDestination}
    callToActionLabel={props.callToActionLabel}></MainMenu>
    <BlockRenderer blocks={props.blocks}></BlockRenderer>
    </div>
    )
}