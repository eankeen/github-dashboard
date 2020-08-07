type fillColorOption = {
	color: string
	backgroundColor: string
}

type fill = {
	blue: fillColorOption
	green: fillColorOption
	neutral: fillColorOption
	orange: fillColorOption
	purple: fillColorOption
	red: fillColorOption
	teal: fillColorOption
	yellow: fillColorOption
}

type paletteColorOption = {
	base: string
	dark: string
	light: string
	lightest: string
}

type scaleColorOption = {
	N1: string
	N1A: string
	N2: string
	N2A: string
	N3: string
	N3A: string
	N4: string
	N4A: string
	N5: string
	N5A: string
	N6: string
	N6A: string
	N7: string
	N7A: string
	N8: string
	N8A: string
	N9: string
	N10: string
}

type fontOption = {
	color: string
	fontFamily: string
	fontSize: string
	fontWeight: number
	letterSpacing: string
	lineHeight: string
	marginTop: number
	textTransform: string
}

export interface theme {
	avatarColors: string[]
	badgeColors: string[]
	colors: {
		background: {
			blueTint: string
			greenTint: string
			orangeTint: string
			overlay: string
			purpleTint: string
			redTint: string
			tealTint: string
			tint1: string
			tint2: string
		}
		border: {
			default: string
			muted: string
		}
		icon: {
			danger: string
			default: string
			disabled: string
			info: string
			muted: string
			selected: string
			success: string
			warning: string
		}
		intent: {
			danger: string
			none: string
			success: string
			warning: string
		}
		text: {
			danger: string
			dark: string
			default: string
			info: string
			muted: string
			selected: string
			success: string
			warning: string
		}
	}
	elevations: string[]
	fills: {
		options: string[]
		solid: fill
		subtle: fill
	}
	getAlertProps: () => {}
	getAvatarInitialsFontSize: () => {}
	getAvatarProps: () => {}
	getBackground: () => {}
	getBadgeClassName: () => {}
	getBadgeProps: () => {}
	getBorderRadiusForControlHeight: () => {}
	getButtonClassName: () => {}
	getCheckboxClassName: () => {}
	getCodeProps: () => {}
	getElevation: () => {}
	getFontFamily: () => {}
	getHeadingStyle: () => {}
	getIconColor: () => {}
	getIconForIntent: () => {}
	getIconSizeForButton: () => {}
	getIconSizeForIconButton: () => {}
	getIconSizeForInput: () => {}
	getIconSizeForSelect: () => {}
	getLinkClassName: () => {}
	getMenuItemClassName: () => {}
	getParagraphStyle: () => {}
	getRadioClassName: () => {}
	getRowClassName: () => {}
	getSegmentedControlRadioClassName: () => {}
	getSelectedClassName: () => {}
	getSwitchClassName: () => {}
	getTabClassName: () => {}
	getTableCellClassName: () => {}
	getTagInputClassName: () => {}
	getTextColor: () => {}
	getTextDropdownButtonClassName: () => {}
	getTextSizeForControlHeight: () => {}
	getTextStyle: () => {}
	getTextareaClassname: () => {}
	getTooltipProps: () => {}
	overlayBackgroundColor: string
	palette: {
		blue: paletteColorOption
		green: paletteColorOption
		neutral: paletteColorOption
		orange: paletteColorOption
		purple: paletteColorOption
		red: paletteColorOption
		teal: paletteColorOption
		yellow: paletteColorOption
	}
	scales: {
		blue: scaleColorOption
		neutral: scaleColorOption
	}
	spinnerColor: string
	typography: {
		fontFamilies: {
			display: string
			mono: string
			ui: string
		}
		headings: {
			100: fontOption
			200: fontOption
			300: fontOption
			400: fontOption
			500: fontOption
			600: fontOption
			700: fontOption
			800: fontOption
			900: fontOption
		}
		paragraph: {
			300: fontOption
			400: fontOption
			500: fontOption
		}
		text: {
			300: fontOption
			400: fontOption
			500: fontOption
			600: fontOption
		}
	}
}
