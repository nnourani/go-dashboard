package main

import (
	"flag"
	"log"

	"github.com/gofiber/fiber"
	"github.com/gofiber/fiber/middleware"
	"github.com/nnourani/go-dashboard/handlers"
)

var (
	port = flag.Int("port", 3001, "Port to listen on")
	prod = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {

	app := fiber.New()

	app.Settings.Prefork = *prod

	app.Use(middleware.Recover())
	app.Use(middleware.Logger())

	app.Get("/", func(c *fiber.Ctx) {
		if err := c.Status(200).SendFile("./static/public/index.html"); err != nil {
			c.Next(err)
		}
	})

	v1 := app.Group("/api/v1")

	v1.Get("/users", handlers.UserList)
	v1.Post("/users", handlers.UserCreate)
	v1.Post("/user/delete", handlers.DeleteUser)

	app.Static("/", "./static/public")

	app.Use(handlers.NotFound)

	log.Fatal(app.Listen(*port))

}
