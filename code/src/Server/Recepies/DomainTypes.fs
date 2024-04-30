namespace Manager.Recepies

open System

[<AutoOpen>]
module DomainTypes =
    type IngredientId = IngredientId of Guid

    type Ingredient =
        {
            Id: IngredientId
            Name: string
        }

    type Mesurement =
        {
            Amount: float
            Unit: string
        }

    type MesuredIngredient =
        {
            Product: Ingredient
            Measurment: Mesurement
        }

    type RecepieId = RecepieId of Guid

    type Recepie =
        {
            Id: RecepieId
            Name: string
            Description: string
            Ingredients: MesuredIngredient list
        }
