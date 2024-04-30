CREATE SCHEMA recepies

    CREATE TABLE ingredient (
        ingredient_id uuid DEFAULT gen_random_uuid(),
        Name VARCHAR NOT NULL,
        PRIMARY KEY (ingredient_id)
    )

    CREATE TABLE recepie (
        recepie_id uuid DEFAULT gen_random_uuid(), 
        name VARCHAR NOT NULL,
        PRIMARY KEY (recepie_id)
    )

    CREATE TABLE recepie_ingredient (
        recepie_id uuid REFERENCES recepie(recepie_id),
        ingredient_id uuid REFERENCES ingredient(ingredient_id),
        amount NUMERIC(4,2) NOT NULL,
        unit VARCHAR NOT NULL,
        CONSTRAINT recepie_ingredient_pk PRIMARY KEY(recepie_id,ingredient_id)
    )
