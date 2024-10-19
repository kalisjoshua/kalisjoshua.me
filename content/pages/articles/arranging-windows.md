## Arrange MacOS Windows
### 19 Oct 2024

I used to use an app called Slate. Since it was well out of maintenance I decided to implement what I minimally needed in AppleScript and Automator.

```
use scripting additions

global CONFIG_COLUMNS, CONFIG_ROWS
global SCREEN_HEIGHT, SCREEN_WIDTH
global SIZE_COLUMN, SIZE_ROW

on arrange(appName, offsetX, offsetY, width, height)
	if offsetX is greater than CONFIG_COLUMNS or offsetX is less than 0 then error "Invalid offsetX for " & appName
	if offsetY is greater than CONFIG_ROWS or offsetY is less than 0 then error "Invalid offsetY for " & appName
	if offsetX + width is greater than CONFIG_COLUMNS then error "Config for " & appName & " would extend beyond the screen"
	if offsetY + height is greater than CONFIG_ROWS then error "Config for " & appName & " would extend beyond the screen"

	set OFFSET_LEFT to round SIZE_COLUMN * offsetX rounding down
	set OFFSET_TOP to round SIZE_ROW * offsetY rounding down
	set OFFSET_RIGHT to round SIZE_COLUMN * width rounding down
	set OFFSET_BOTTOM to round SIZE_ROW * height rounding down
	set POS to {OFFSET_LEFT, OFFSET_TOP, OFFSET_RIGHT, OFFSET_BOTTOM}

	try
		tell application appName
			set bounds of windows to {OFFSET_LEFT, OFFSET_TOP, OFFSET_LEFT + OFFSET_RIGHT, OFFSET_TOP + OFFSET_BOTTOM}
		end tell
	on error
		try
			tell application "System Events"
				set targetWindow to first window of application process appName

				set position of targetWindow to {OFFSET_LEFT, OFFSET_TOP}
				set size of targetWindow to {OFFSET_RIGHT, OFFSET_BOTTOM}
			end tell
		on error message
			log message
		end try
	end try
end arrange

on run
	set CONFIG_COLUMNS to 12
	set CONFIG_ROWS to 6

	tell application "Finder"
		set {0, 0, SCREEN_WIDTH, SCREEN_HEIGHT} to bounds of window of desktop
		set SIZE_COLUMN to SCREEN_WIDTH / CONFIG_COLUMNS
		set SIZE_ROW to SCREEN_HEIGHT / CONFIG_ROWS
	end tell

	-- arrange("Automator", 4, 0, 6, 6)
	arrange("Firefox", 0, 0, 6, 6)
	arrange("Music", 4, 3, 3, 3)
	arrange("Script Editor", 4, 1, 4, 4)
	arrange("Visual Studio Code", 4, 0, 6, 6)
end run
```
