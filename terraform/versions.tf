terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 3.0"
    }
  }

  # Intentionally no backend block. This phase ships local-state Terraform
  # for review only - nothing here has been applied against a real Azure
  # subscription. Configure a remote (azurerm storage account) backend once
  # a subscription exists and the captain decides on a state storage account.
}

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
}

provider "azuread" {
  tenant_id = var.tenant_id
}
