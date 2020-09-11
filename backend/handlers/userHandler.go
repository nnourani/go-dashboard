package handlers

import (
	"strconv"

	"github.com/gofiber/fiber"
	"github.com/nnourani/go-dashboard/database"
	"github.com/nnourani/go-dashboard/models"
)

var db = database.Connect()

// UserList return users list
func UserList(c *fiber.Ctx) {
	users := database.Get(db)
	if err := c.JSON(fiber.Map{
		"success": true,
		"users":   users,
	}); err != nil {
		c.Next(err)
	}
}

// UserCreate registers a user
func UserCreate(c *fiber.Ctx) {
	user := &models.User{
		FirstName: c.FormValue("firstName"),
		LastName:  c.FormValue("lastName"),
	}
	database.Insert(user, db)
	if err := c.JSON(fiber.Map{
		"success": true,
		"user":    user,
	}); err != nil {
		c.Next(err)
	}
}

// UserLogin registers a user
func UserLogin(c *fiber.Ctx) {
	if err := c.JSON(fiber.Map{
		"success": true,
		"token":   "8555858585858555",
	}); err != nil {
		c.Next(err)
	}
}

// DeleteUser registers a user
func DeleteUser(c *fiber.Ctx) {
	id, _ := strconv.Atoi(c.FormValue("id"))
	database.DeleteUser(id, db)
	if err := c.JSON(fiber.Map{
		"success": true,
	}); err != nil {
		c.Next(err)
	}
}

// NotFound returns custom 404 page
func NotFound(c *fiber.Ctx) {
	if err := c.Status(404).SendFile("./static/private/404.html"); err != nil {
		c.Next(err)
	}
}
