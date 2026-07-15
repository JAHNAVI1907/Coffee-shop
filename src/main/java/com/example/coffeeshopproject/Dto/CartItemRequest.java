package com.example.coffeeshopproject.Dto;

public class CartItemRequest {
    private Long customerId;
    private Long menuItemId;
    private int quantity;

    // Getter and Setter for customerId
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    // Getter and Setter for menuItemId
    public Long getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(Long menuItemId) {
        this.menuItemId = menuItemId;
    }

    // Getter and Setter for quantity
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
