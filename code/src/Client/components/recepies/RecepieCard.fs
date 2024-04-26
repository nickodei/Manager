module Components.Recepie.RecepieCard

open Feliz
open Feliz.DaisyUI

open Shared
open Manager.Client.Router

[<ReactComponent>]
let View (props: {| recepie: RecepieOverview |}) : ReactElement =
    Daisy.card [
        card.bordered
        prop.children [
            Daisy.cardBody [
                Daisy.cardTitle props.recepie.Title
                Html.p ("test: " + props.recepie.Id)
                Daisy.cardActions [
                    Daisy.button.button [
                        prop.text "Go to recepie"
                        button.primary
                        prop.onClick (fun (_) -> Router.navigatePage (Page.RecepiesEdit props.recepie.Id))
                    ]
                ]
            ]
        ]
    ]
