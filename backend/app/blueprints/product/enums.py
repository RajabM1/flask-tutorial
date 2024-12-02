import enum


class ItemStatus(enum.Enum):
    ACTIVE = "active"
    OUT_OF_STOCK = "out_of_stock"
    DISCONTINUED = "discontinued"
    COMING_SOON = "coming_soon"
