package utils

import "os"

func GetEnvOrDefault(envPath string, defaultEnv string) string {
	env := os.Getenv(envPath)
	if env == "" {
		return defaultEnv
	}
	return env
}
