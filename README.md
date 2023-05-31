# CookBook - Student Project

> Application uuCookbook is a simple cookbook with specific focus. It is a searchable, filterable cookbook.

## Task Description

It is preferred not to create a common cookbook, but rather a specific one. For example cookbook for grilling, or specific "cookbook" for preparing different kinds of coffee drinks, or even some fancy drinks.

Each recipe consists of several materials.
Materials are used for preparing some recipe. There is defined amount of material for defined amount of specified recipe. Application needs to be able to recalculate materials based on "portions" of final product.

## Basic attributes of recipe (examples)

+ `name`
+ `description` - longer, structured text (steps etc.)
+ `final amount` - amount of final product
+ `preparation length` - time needed for preparation
+ `ingredients` - list of materials with amount
+ `code` - link to material from different collection
+ `amount` - amount of material needed for recipe

## Basic attributes of material (examples)

+ **Access rights** : In design there needs to be a clear description of different actors which would use such a system.
In implementation there is no need to handle different users (no difference between editor and reader)
Business Requests
Use uuBook Business Requests dedicated for the student project team.
+ **Vision** : Describe Vision of the product.
+ **Dictionary**: Explain the most important terms related to the domain of the application in the Dictionary.
+ **Context** : Create a new page called Context and create an illustrative example which will be used in user stories.
+ **User Story** : Identify and write down the most important User Stories.

## Business Model scope

Use uuBook Business Model dedicated for the student project team.

+ **Business Discipline** : Describe the specification of business.
+ **Processes** : Describe all processes and their relations.
+ **Business Actors** : Describe all actors and define if it is business role or business group.
+ **Products** : Describe products (entity from the real world) which are related to this business.
+ **Business Use-cases** : Describe flow of BUCs including wireframe and its description.
At least one BUC per team member.

## Application Model scope

+ Use uuBook Application Model dedicated for the student project team.
+ Store all source code into a dedicated git repository.
+ Standard Application Model pages
+ Fill in all the standard Application Model pages (Application Structure, uuSubApp).
+ Since the application does not handle different users, do not fill in Profiles.
+ Complete Data Model
+ Design a complete data model (schema diagram and individual uuSchemas for all objects, their indexes and DAO methods).
+ uuCmd, uu5Uve, uu5Route, uu5Components and uuScript design
+ Design uuCmds, uu5Uve, uu5Routes, uu5Components and uuScripts.
+ At least one uuCmd per team member.
+ At least two uu5Routes and all uu5Components used on the uu5Routes.
