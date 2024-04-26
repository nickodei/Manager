namespace Manager.Recepies

[<AutoOpen>]
module DomainTypes =
    type RecepieId = RecepieId of int

    type Recepie =
        { Id: RecepieId
          Title: string
          Description: string }
