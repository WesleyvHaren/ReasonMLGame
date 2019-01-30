type state = {
  isSelected: bool,
  isHovered: bool,
  isTargeted: bool,
};

type action =
  | Click(Square.square)
  | HoverOn
  | HoverOff;

let getClasses = (square : Square.square) =>
  "grid__square"
  ++ (square.isSelected ? " grid__square--selected" : "")
  ++ (! square.isSelected && square.isHovered && !square.isTargeted ? " grid__square--hovered" : "")
  ++ (! square.isSelected && square.isTargeted ? " grid__square--targeted" : "")
  ++ (square.inMovementRange ? " grid__square--in-movement-range" : "");


let component = ReasonReact.reducerComponent("Square");

let make = (~square: Square.square, ~handleClick ,~gamestate: Gamestate.gamestate, _children ) => {
  ...component,
  initialState: () => {isSelected: square.isSelected, isHovered: false, isTargeted: false},
  reducer: (action, state) =>
    switch (action) {
    | HoverOn => ReasonReact.Update({...state, isHovered: true})
    | HoverOff => ReasonReact.Update({...state, isHovered: false})
    },
  render: self => {
    let unitImage = switch(Gamestate.findUnit(gamestate.units, square.coordinates)) {
                    | None => ""
                    | Some(unit) => Unit.isAlive(unit) ? "http://127.0.0.1:5500/src/images/" ++ unit.imagePath : ""
    };
    <svg
      onClick=(_event => handleClick(GlobalActions.ClickedSquare(square)))
      onMouseOver=(_event => handleClick(GlobalActions.HoverSquare(square)))
      onMouseLeave=(_event => self.send(HoverOff))
      className=(getClasses(square))
    >
      <image width="60" height="60" href="http://127.0.0.1:5500/src/images/terrain/mountain.png" alt="lalala"></image>
      <image width="60" height="60" href={unitImage} alt="lalala"></image>
    </svg>
  },
};