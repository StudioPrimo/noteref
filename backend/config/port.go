package config

import "github.com/StudioPrimo/noteref/utils"

func Port() string {
	return utils.GetEnvOrDefault("PORT", "8080")
}
