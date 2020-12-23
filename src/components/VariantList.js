import React from "react"
import { Item } from "semantic-ui-react"
import VariantListItem from "./VariantListItem"

const VariantList = (props) => {
  return (
    <>
      <Item.Group divided style={{ marginTop: "5em" }}>
        {props.variants
          ? props.variants.map((vinyl) => (
              <VariantListItem
                vinyl={vinyl}
                key={vinyl.id}
                collection={props.collection}
                wantlist={props.wantlist}
                addVinylToCollection={props.addVinylToCollection}
                removeVinylFromCollection={props.removeVinylFromCollection}
                addVinylToWantlist={props.addVinylToWantlist}
                removeVinylFromWantlist={props.removeVinylFromWantlist}
              />
            ))
          : null}
      </Item.Group>
    </>
  )
}

export default VariantList
