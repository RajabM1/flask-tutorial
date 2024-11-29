import enum


class UserRole(enum.Enum):
    CUSTOMER = "customer"
    STAFF = "staff"
    ADMIN = "admin"


class AccountStatus(enum.Enum):
    ACTIVE = "active"
    SUSPENDED = "suspended"
    DELETED = "deleted"
