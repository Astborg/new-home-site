import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export default function Home(props) {
  console.log(props);
  return <div><BlockRenderer blocks={props.blocks}></BlockRenderer></div>;
}

export const getStaticProps = async () => {
  try {
    const response = await client.query({
      query: gql`
        query PageQuery {
          nodeByUri(uri: "/") {
            ... on Page {
              id
              blocks
            }
          }
          acfOptionsMainMenu {
            Mainmenu {
              menuItems {
                menuItem {
                  destination {
                    ...on Page {
                      uri
                    }
                  }
                  label
                }
                items {
                  destination {
                    ...on Page {
                      uri
                    }
                  }
                  label
                }
              }
            }
          }
        }
      `
    });

    console.log('GraphQL Response:', response);

    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      // Handle errors, maybe set a default value for blocks or show an error message
    }

    return {
      props: {
        mainMenuItems: response.data.acfOptionsMainMenu.mainMenu.menuItems,
        blocks: cleanAndTransformBlocks(response.data.nodeByUri.blocks),
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // Handle the error, maybe set a default value for blocks or show an error message
    return {
      props: {
        mainMenuItems: [],
        blocks: [], // Set a default value
      },
    };
  }
};