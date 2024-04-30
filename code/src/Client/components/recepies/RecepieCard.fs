module Components.Recepie.RecepieCard

open Feliz
open Feliz.DaisyUI

open Manager.Shared.Recepies
open Manager.Client.Router

[<ReactComponent>]
let View (props: {| recepie: RecepieInfoDto |}) : ReactElement =
    Daisy.card [
        card.bordered
        prop.children [
            Daisy.cardBody [
                Daisy.cardTitle props.recepie.Title
                Html.p ("test: " + props.recepie.Id.ToString())
                Daisy.cardActions [
                    Daisy.button.button [
                        prop.text "Go To recepie"
                        button.primary
                        prop.onClick (fun (_) -> Router.navigatePage (Page.RecepiesEdit props.recepie.Id))
                    ]
                ]
            ]
        ]
    ]
