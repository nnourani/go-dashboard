package models

// User model
type User struct {
	ID        int    `gorm:"primaryKey;column:ID"`
	FirstName string `gorm:"column:FIRST_NAME"`
	LastName  string `gorm:"column:LAST_NAME"`
}

// TableName return table name
func (User) TableName() string {
	return "USERS"
}
