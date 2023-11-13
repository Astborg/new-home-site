import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
   
    try {
    const uri = context.params?.slug ? `/${context.params?.slug.join('/')}/`: "/"
    console.log("Generated URI:", uri);
    console.log("Slug:", context.params?.slug);
    const {data} = await client.query({
      query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks
          }
        }
        acfOptionsMainMenu {
          Mainmenu {
            callToActionButton {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
            menuItems {
              menuItem {
                destination {
                  ...on Page{
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ...on Page{
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
      `,
      variables: {
        uri
      }
      
    })
  
    console.log(data)
    const mainMenu = data.acfOptionsMainMenu?.Mainmenu;
    const menuItems = mapMainMenuItems(mainMenu?.menuItems || []);
  
    console.log("Mainmenu:", mainMenu);
    console.log("menuItems:", menuItems);
  
    return {
      props: {
        mainMenuItems: menuItems,
        blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
        callToActionLabel: mainMenu?.callToActionButton?.label || "",
       callToActionDestination: mainMenu?.callToActionButton?.destination?.uri || "",
      },
    };
  } catch (error) {
    console.error("GraphQL query error:", error);
    throw error;
  }
  }