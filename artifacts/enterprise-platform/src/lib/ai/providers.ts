export interface AIProvider {
  id: string;
  name: string;
  description: string;
  website?: string;
  cloud: boolean;
  local: boolean;
  requiresApiKey: boolean;
  supportsVision: boolean;
  supportsFunctionCalling: boolean;
  supportsStreaming: boolean;
  supportsReasoning: boolean;
  supportedModels: string[];
}

export const AI_PROVIDERS: AIProvider[] = [

  {
    id: "openai",
    name: "OpenAI",
    description: "OpenAI GPT Models",
    website: "https://platform.openai.com",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "azure-openai",
    name: "Azure OpenAI",
    description: "Microsoft Azure OpenAI Service",
    website: "https://azure.microsoft.com",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude AI Models",
    website: "https://anthropic.com",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "google",
    name: "Google Gemini",
    description: "Google Gemini Models",
    website: "https://ai.google.dev",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "ollama",
    name: "Ollama",
    description: "Local AI Models",
    website: "https://ollama.com",
    cloud: false,
    local: true,
    requiresApiKey: false,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "mistral",
    name: "Mistral AI",
    description: "Mistral Cloud Models",
    website: "https://mistral.ai",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "groq",
    name: "Groq",
    description: "Groq Inference Platform",
    website: "https://groq.com",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: false,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "cohere",
    name: "Cohere",
    description: "Cohere Command Models",
    website: "https://cohere.com",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: false,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "deepseek",
    name: "DeepSeek",
    description: "DeepSeek AI",
    website: "https://deepseek.com",
    cloud: true,
    local: true,
    requiresApiKey: true,
    supportsVision: false,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Multiple AI Models",
    website: "https://openrouter.ai",
    cloud: true,
    local: false,
    requiresApiKey: true,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

  {
    id: "custom",
    name: "Custom Provider",
    description: "Self-hosted or Enterprise AI",
    cloud: true,
    local: true,
    requiresApiKey: true,
    supportsVision: true,
    supportsFunctionCalling: true,
    supportsStreaming: true,
    supportsReasoning: true,
    supportedModels: [],
  },

];