package database

import (
	"fmt"
	"sync"

	"github.com/nnourani/go-dashboard/config"

	"github.com/nnourani/go-dashboard/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	users []*models.User
	mu    sync.Mutex
)

// Connect with database
func Connect() *gorm.DB {
	dsn := config.Config("DB_USER") + ":" + config.Config("DB_PASS") + "@tcp(" + config.Config("DB_HOST") + ":" + config.Config("DB_PORT") + ")/" + config.Config("DB_NAME") + "?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Db onnection error: ", err)
	} else {
		fmt.Println("Connected with database")
	}

	return db
}

// Insert user
func Insert(user *models.User, db *gorm.DB) {
	mu.Lock()
	db.Create(user)
	mu.Unlock()
}

// Get users
func Get(db *gorm.DB) []*models.User {
	db.Find(&users)
	return users
}

// DeleteUser users
func DeleteUser(id int, db *gorm.DB) {
	db.Delete(&models.User{}, id)
}
