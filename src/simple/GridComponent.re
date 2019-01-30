 type state = { gameState: Gamestate.gamestate};
let component = ReasonReact.reducerComponent("Grid");

/* let moveClicked = (gamestate: Gamestate.gamestate) => ReasonReact.Update({gameState: {...gamestate, interactionMode: MovingUnit}}); */
let moveClicked = (gamestate: Gamestate.gamestate) => ReasonReact.Update({gameState: InterActionModeHandlers.showMovementRange(gamestate, 1)});
let attackClicked = (gamestate: Gamestate.gamestate) => ReasonReact.Update({gameState: {...gamestate, interactionMode: AttackingUnit}});
let shopClicked = (gamestate: Gamestate.gamestate) => ReasonReact.Update({gameState: {...gamestate, interactionMode: OpenShop}});
let closeShop = (gamestate: Gamestate.gamestate) => ReasonReact.Update({gameState: {...gamestate, interactionMode: HeroSelected}});
let equip = (gameState: Gamestate.gamestate, itemTypes: Equipment.itemTypes) =>  ReasonReact.Update({gameState: {...gameState, units: List.map( (unit: Unit.unit) => Option.contains(gameState.selectedUnitId, unit.id) ? {...unit, equipment: Equipment.equip(unit.equipment, Equipment.createItem(itemTypes)) } : unit, gameState.units), interactionMode: SelectingAction }})

let make = (_children, ~gamestate: Gamestate.gamestate) => {
  ...component,
  initialState: () => {gameState: gamestate},  
  reducer: (action: GlobalActions.action, state) =>
    switch (action) {
    | ClickedSquare(clickedSquare) => {
      switch (state.gameState.interactionMode) {
        | SelectingAction => ReasonReact.Update({gameState: InterActionModeHandlers.selectActionClickedSquareHandler(state.gameState, clickedSquare) })
        | NpcSelected=> ReasonReact.Update({gameState: InterActionModeHandlers.selectActionClickedSquareHandler(state.gameState, clickedSquare) })
        | HeroSelected => ReasonReact.Update({gameState: InterActionModeHandlers.selectActionClickedSquareHandler(state.gameState, clickedSquare) })
        | MonsterSelected => ReasonReact.Update({gameState: InterActionModeHandlers.selectActionClickedSquareHandler(state.gameState, clickedSquare) })
        
        /* | MovingUnit =>  ReasonReact.Update({gameState: {...state.gameState, units: List.map( (unit: Unit.unit) => Option.contains(state.gameState.selectedUnitId, unit.id) ? {...unit, coordinates: { x: clickedSquare.coordinates.x, y: clickedSquare.coordinates.y } } : unit, state.gameState.units), interactionMode: SelectingAction }}) */
        | MovingUnit =>  ReasonReact.Update({gameState: InterActionModeHandlers.moveIfValidLocationHandler(state.gameState, clickedSquare) })
        | AttackingUnit => ReasonReact.Update({gameState: InterActionModeHandlers.attackIfTargetHandler(state.gameState, clickedSquare) })
        | Targeting(skill) => ReasonReact.Update({ gameState: { ...SkillEffectDataService.getSkillEffect(skill)(state.gameState, clickedSquare), interactionMode: SelectingAction }})
        | OpenShop => ReasonReact.Update(state)
      }
    } 
    | HoverSquare(hoveredSquare) => {
      switch(state.gameState.interactionMode) {
        | Targeting(skill) => ReasonReact.Update({gameState: { ...state.gameState, grid: { 
          squares: List.map(square => SkillEffectDataService.getSquaresInAreaOfEffect(skill.targetingReticule, state.gameState.grid.squares, hoveredSquare.coordinates) |> List.exists(areaSquare => areaSquare == square) ? { ...square, isTargeted: true } : { ...square, isTargeted: false }, state.gameState.grid.squares) }}})
        | _ => ReasonReact.Update({gameState: { ...state.gameState, grid: { squares: List.map(square => square == hoveredSquare ? { ...square, isHovered: true } : { ...square, isHovered: false }, state.gameState.grid.squares) }}}) 
      }
    }
    | MoveClicked => moveClicked(state.gameState)
    | AttackClicked => attackClicked(state.gameState)
    | ShopClicked => shopClicked(state.gameState)
    | SelectSkill(skill) => 
        switch(skill.targetingReticule) {
        | NoTarget => ReasonReact.Update({ gameState: { ...SkillEffectDataService.getSkillEffect(skill)(state.gameState, List.hd(state.gameState.grid.squares)), interactionMode: SelectingAction }})
        | _ => ReasonReact.Update({ gameState: { ...state.gameState, interactionMode: Targeting(skill) }})
        }
    | Close => {
      switch(state.gameState.interactionMode) {
        | OpenShop => closeShop(state.gameState)
        | _ => ReasonReact.Update(state)
      }
    }
    | Equip(itemTypes) => equip(state.gameState, itemTypes)
    },
  render: self =>
    <div className="grid">         
      (Utils.createGrid(10, 10, Utils.createSquare(self.send, self.state.gameState), self.state.gameState.grid.squares))
      <div>(ReasonReact.string(Option.optionIntToString(self.state.gameState.selectedUnitId)))</div>
      <div>(ReasonReact.string("Turnorder?"))</div>
      <div>(List.map((unit: Unit.unit) => ReasonReact.string(string_of_int(unit.id)), Unit.determineTurnOrder(self.state.gameState.units)) |> Array.of_list |> ReasonReact.array)</div>
      <div>(Option.map(InterActionModeHandlers.findUnitInUnitList(self.state.gameState.units), self.state.gameState.selectedUnitId) 
      |> Option.map((unit: Unit.unit) => unit.hp) |> Option.optionIntToString |> ReasonReact.string)</div>
      (self.state.gameState.interactionMode == HeroSelected && Option.contains(self.state.gameState.selectedUnitId, List.hd(Unit.determineTurnOrder(self.state.gameState.units)).id) 
      ? <div>
        <button onClick=(_event => self.send(MoveClicked)) >(ReasonReact.string("Move"))</button>
        <button onClick=(_event => self.send(AttackClicked)) >(ReasonReact.string("Attack"))</button>
        <button onClick=(_event => self.send(ShopClicked)) >(ReasonReact.string("Open shop"))</button>
        (List.hd(Unit.determineTurnOrder(self.state.gameState.units)).skills |> List.map(skill =>
        <button onClick=(_event => self.send(SelectSkill(skill)))>(ReasonReact.string(skill.name))</button>) |> Array.of_list |> ReasonReact.array        
        )
      </div>
      : <span/>
      )
      (self.state.gameState.interactionMode == OpenShop  && Option.contains(self.state.gameState.selectedUnitId, List.hd(Unit.determineTurnOrder(self.state.gameState.units)).id)
      ? <div>
        <button onClick=(_event => self.send(Equip(Sword))) >(ReasonReact.string("Sword"))</button>    
        <button onClick=(_event => self.send(Equip(TwoHanded))) >(ReasonReact.string("Two-Handed Sword"))</button>          
        <button onClick=(_event => self.send(Close)) >(ReasonReact.string("Close"))</button>      
      </div>
      :<span/>
      )
    </div>,
};