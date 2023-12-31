package main

import (
	"flag"
	"fmt"
	"github.com/TheZoraiz/ascii-image-converter/aic_package"
)

func main() {
	filePathPtr := flag.String("file", "", "Path to the image file.")
	flag.Parse()

	if *filePathPtr == "" {
		fmt.Println("No file path provided. Use -file to specify the file path.")
		return
	}

	flags := aic_package.DefaultFlags()
	flags.Dimensions = []int{100, 55}
	flags.Colored = true
	flags.SaveTxtPath = "."
	flags.SaveImagePath = "."
	flags.CustomMap = " .-=+#@"
	flags.SaveBackgroundColor = [4]int{50, 50, 50, 100}

	asciiArt, err := aic_package.Convert(*filePathPtr, flags)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Printf("%v\n", asciiArt)
}
