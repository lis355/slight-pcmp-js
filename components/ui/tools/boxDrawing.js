// https://en.wikipedia.org/wiki/Box-drawing_character
//         0	1	2	3	4	5	6	7	8	9	A	B	C	D	E	F
// U+250x	─	━	│	┃	┄	┅	┆	┇	┈	┉	┊	┋	┌	┍	┎	┏
// U+251x	┐	┑	┒	┓	└	┕	┖	┗	┘	┙	┚	┛	├	┝	┞	┟
// U+252x	┠	┡	┢	┣	┤	┥	┦	┧	┨	┩	┪	┫	┬	┭	┮	┯
// U+253x	┰	┱	┲	┳	┴	┵	┶	┷	┸	┹	┺	┻	┼	┽	┾	┿
// U+254x	╀	╁	╂	╃	╄	╅	╆	╇	╈	╉	╊	╋	╌	╍	╎	╏
// U+255x	═	║	╒	╓	╔	╕	╖	╗	╘	╙	╚	╛	╜	╝	╞	╟
// U+256x	╠	╡	╢	╣	╤	╥	╦	╧	╨	╩	╪	╫	╬	╭	╮	╯
// U+257x	╰	╱	╲	╳	╴	╵	╶	╷	╸	╹	╺	╻	╼	╽	╾	╿

// export const BOX_CHARS = {
// LEFT_TOP: "╔",
// TOP_RIGHT: "╗",
// RIGHT_BOTTOM: "╝",
// BOTTOM_LEFT: "╚",
// HORIZONTAL: "─",
// VERTICAL: "│",
// LEFT: "╣",
// RIGHT: "╠",
// TOP: "╩",
// BOTTOM: "╦",
// MIDDLE: "╬"
// };

// export const SCROLL_BAR_CHARS = {
// 	EMPTY: "┆",
// 	BAR: "█"
// };

// export function getTextInBorder(text) {
// 	return `╣ ${text} ╠`;
// }

export const BOX_CHARS = {
	LEFT_TOP: "╭",
	TOP_RIGHT: "╮",
	RIGHT_BOTTOM: "╯",
	BOTTOM_LEFT: "╰",
	HORIZONTAL: "─",
	VERTICAL: "│",
	LEFT: "┤",
	RIGHT: "├",
	TOP: "┴",
	BOTTOM: "┬",
	MIDDLE: "┼"
};

export const SCROLL_BAR_CHARS = {
	EMPTY: "┆",
	BAR: "▌"
};

export function getTextInBorder(text) {
	return `${BOX_CHARS.LEFT} ${text} ${BOX_CHARS.RIGHT}`;
}
