package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config func to get env value rom key
func Config(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	return os.Getenv(key)
}
