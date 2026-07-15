export interface AIModel {

  id: string;

  name: string;

  providerId: string;

  family: string;

  version: string;

  description: string;

  releasedBy: string;

  contextWindow: number;

  maxOutputTokens: number;

  supportsVision: boolean;

  supportsReasoning: boolean;

  supportsFunctionCalling: boolean;

  supportsStreaming: boolean;

  supportsEmbeddings: boolean;

  supportsFineTuning: boolean;

  local: boolean;

  cloud: boolean;

  recommended: boolean;

  active: boolean;

  pricing?: {

    inputPerMillion?: number;

    outputPerMillion?: number;

  };

  modalities: (

    | "text"

    | "image"

    | "audio"

    | "video"

    | "code"

  )[];

  supportsJsonMode: boolean;

  supportsMCP: boolean;

  supportsToolChoice: boolean;

  supportsThinking: boolean;

  supportsWebSearch: boolean;

  supportsVisionOCR: boolean;

  supportsImageGeneration: boolean;

  supportsSpeechToText: boolean;

  supportsTextToSpeech: boolean;

  supportsRealtime: boolean;

  supportsRAG: boolean;

  supportsMultiAgent: boolean;

  supportsMemory: boolean;

  supportsAPI: boolean;

  maxFileSizeMB?: number;

  maxImages?: number;

  recommendedFor: (

    | "general"

    | "reasoning"

    | "coding"

    | "finance"

    | "security"

    | "hr"

    | "analytics"

    | "vision"

    | "multimodal"

  )[];

}


export const AI_MODELS: AIModel[] = [

  {
  id: "gpt-5-mini",
  name: "GPT-5 Mini",
  providerId: "openai",
  family: "GPT",
  version: "5 Mini",
  description: "Lightweight GPT-5 model.",
  releasedBy: "OpenAI",
  contextWindow: 400000,
  maxOutputTokens: 128000,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: false,
  active: true,

  pricing: {
    inputPerMillion: 0.25,
    outputPerMillion: 2,
  },

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "analytics",
    "vision",
    "multimodal",
  ],

},

{
  id: "gpt-4.1",
  name: "GPT-4.1",
  providerId: "openai",
  family: "GPT",
  version: "4.1",
  description: "General purpose GPT-4.1.",
  releasedBy: "OpenAI",
  contextWindow: 1000000,
  maxOutputTokens: 32768,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "vision",
  ],

},

{
  id: "gpt-4.1-mini",
  name: "GPT-4.1 Mini",
  providerId: "openai",
  family: "GPT",
  version: "4.1 Mini",
  description: "Efficient GPT-4.1 model.",
  releasedBy: "OpenAI",
  contextWindow: 1000000,
  maxOutputTokens: 32768,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
 cloud: true,
  recommended: false,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
    "coding",
  ],

},

{
  id: "o3",
  name: "o3",
  providerId: "openai",
  family: "Reasoning",
  version: "o3",
  description: "Advanced reasoning model.",
  releasedBy: "OpenAI",
  contextWindow: 200000,
  maxOutputTokens: 100000,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "reasoning",
    "coding",
    "analytics",
  ],

},

{
  id: "claude-opus-4",
  name: "Claude Opus 4",
  providerId: "anthropic",
  family: "Claude",
  version: "Opus 4",
  description: "Anthropic flagship reasoning model.",
  releasedBy: "Anthropic",
  contextWindow: 200000,
  maxOutputTokens: 32000,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: true,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "analytics",
  ],

},

{
  id: "claude-sonnet-4",
  name: "Claude Sonnet 4",
  providerId: "anthropic",
  family: "Claude",
  version: "Sonnet 4",
  description: "Balanced Claude model.",
  releasedBy: "Anthropic",
  contextWindow: 200000,
  maxOutputTokens: 32000,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: true,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
    "coding",
    "reasoning",
  ],

},

{
  id: "claude-haiku",
  name: "Claude Haiku",
  providerId: "anthropic",
  family: "Claude",
  version: "Haiku",
  description: "Fast lightweight Claude model.",
  releasedBy: "Anthropic",
  contextWindow: 200000,
  maxOutputTokens: 16000,
  supportsVision: true,
  supportsReasoning: false,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: false,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: false,
  supportsWebSearch: false,
  supportsVisionOCR: true,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 256,
  maxImages: 10,

  recommendedFor: [
    "general",
  ],

},

{
  id: "gemini-2.5-pro",
  name: "Gemini 2.5 Pro",
  providerId: "google",
  family: "Gemini",
  version: "2.5 Pro",
  description: "Google flagship multimodal reasoning model.",
  releasedBy: "Google",
  contextWindow: 1000000,
  maxOutputTokens: 65536,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: true,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "audio",
    "video",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 1024,
  maxImages: 50,

  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "vision",
    "multimodal",
  ],

},

{
  id: "gemini-2.5-flash",
  name: "Gemini 2.5 Flash",
  providerId: "google",
  family: "Gemini",
  version: "2.5 Flash",
  description: "Fast Gemini model for everyday enterprise tasks.",
  releasedBy: "Google",
  contextWindow: 1000000,
  maxOutputTokens: 65536,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: true,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "audio",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: false,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 1024,
  maxImages: 50,

  recommendedFor: [
    "general",
    "coding",
    "multimodal",
  ],

},

{
  id: "gemini-flash-lite",
  name: "Gemini Flash Lite",
  providerId: "google",
  family: "Gemini",
  version: "Flash Lite",
  description: "Lightweight Gemini model optimized for speed.",
  releasedBy: "Google",
  contextWindow: 1000000,
  maxOutputTokens: 32768,
  supportsVision: true,
  supportsReasoning: false,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: false,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: false,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
  ],

},

{
  id: "llama-3.1-8b",
  name: "Llama 3.1 8B",
  providerId: "ollama",
  family: "Llama",
  version: "3.1 8B",
  description: "Meta Llama 3.1 8B running locally with Ollama.",
  releasedBy: "Meta",
  contextWindow: 128000,
  maxOutputTokens: 8192,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: true,
  cloud: false,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 0,

  recommendedFor: [
    "general",
    "coding",
    "reasoning",
  ],

},

{
  id: "llama-3.1-70b",
  name: "Llama 3.1 70B",
  providerId: "ollama",
  family: "Llama",
  version: "3.1 70B",
  description: "High-performance local enterprise model.",
  releasedBy: "Meta",
  contextWindow: 128000,
  maxOutputTokens: 8192,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: true,
  cloud: false,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 0,

  recommendedFor: [
    "general",
    "reasoning",
    "analytics",
  ],

},

{
  id: "qwen-3",
  name: "Qwen 3",
  providerId: "ollama",
  family: "Qwen",
  version: "3",
  description: "Alibaba Qwen 3 local model.",
  releasedBy: "Alibaba",
  contextWindow: 128000,
  maxOutputTokens: 8192,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: true,
  cloud: false,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 0,

  recommendedFor: [
    "general",
    "coding",
    "reasoning",
  ],

},

{
  id: "deepseek-v3",
  name: "DeepSeek V3",
  providerId: "deepseek",
  family: "DeepSeek",
  version: "V3",
  description: "General-purpose DeepSeek foundation model.",
  releasedBy: "DeepSeek",
  contextWindow: 128000,
  maxOutputTokens: 8192,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: true,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 0,

  recommendedFor: [
    "general",
    "coding",
    "reasoning",
    "analytics",
  ],

},

{
  id: "deepseek-r1",
  name: "DeepSeek R1",
  providerId: "deepseek",
  family: "DeepSeek",
  version: "R1",
  description: "Advanced reasoning model optimized for complex enterprise tasks.",
  releasedBy: "DeepSeek",
  contextWindow: 128000,
  maxOutputTokens: 8192,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: true,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 0,

  recommendedFor: [
    "reasoning",
    "coding",
    "analytics",
  ],

},

{
  id: "azure-gpt-5",
  name: "Azure GPT-5",
  providerId: "azure-openai",
  family: "GPT",
  version: "5",
  description: "Azure-hosted GPT-5 enterprise model.",
  releasedBy: "Microsoft",
  contextWindow: 400000,
  maxOutputTokens: 128000,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "analytics",
    "vision",
    "multimodal",
  ],

},

{
  id: "azure-gpt-4.1",
  name: "Azure GPT-4.1",
  providerId: "azure-openai",
  family: "GPT",
  version: "4.1",
  description: "Azure-hosted GPT-4.1 enterprise model.",
  releasedBy: "Microsoft",
  contextWindow: 1000000,
  maxOutputTokens: 32768,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "image",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 20,

  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "vision",
  ],

},

{
  id: "mistral-large",
  name: "Mistral Large",
  providerId: "mistral",
  family: "Mistral",
  version: "Large",
  description: "Mistral flagship enterprise model.",
  releasedBy: "Mistral AI",
  contextWindow: 128000,
  maxOutputTokens: 32000,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: true,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 0,

  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "analytics",
  ],

},

{
  id: "codestral",
  name: "Codestral",
  providerId: "mistral",
  family: "Codestral",
  version: "Latest",
  description: "Specialized coding model by Mistral.",
  releasedBy: "Mistral AI",
  contextWindow: 256000,
  maxOutputTokens: 32000,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,

  pricing: {},

  modalities: [
    "text",
    "code",
  ],

  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,

  maxFileSizeMB: 512,
  maxImages: 0,

  recommendedFor: [
    "coding",
    "reasoning",
  ],

},

{
  id: "llama-3.3-70b-groq",
  name: "Llama 3.3 70B",
  providerId: "groq",
  family: "Llama",
  version: "3.3 70B",
  description: "Ultra-fast inference powered by Groq.",
  releasedBy: "Groq",
  contextWindow: 131072,
  maxOutputTokens: 32768,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,
  pricing: {},
  modalities: ["text","code"],
  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,
  maxFileSizeMB: 512,
  maxImages: 0,
  recommendedFor: [
    "general",
    "coding",
    "reasoning",
  ],
},

{
  id: "command-r-plus",
  name: "Command R+",
  providerId: "cohere",
  family: "Command",
  version: "R+",
  description: "Enterprise retrieval and reasoning model.",
  releasedBy: "Cohere",
  contextWindow: 128000,
  maxOutputTokens: 16000,
  supportsVision: false,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: true,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,
  pricing: {},
  modalities: ["text"],
  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: false,
  supportsVisionOCR: false,
  supportsImageGeneration: false,
  supportsSpeechToText: false,
  supportsTextToSpeech: false,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,
  maxFileSizeMB: 512,
  maxImages: 0,
  recommendedFor: [
    "general",
    "reasoning",
    "analytics",
  ],
},

{
  id: "openrouter-auto",
  name: "OpenRouter Auto",
  providerId: "openrouter",
  family: "Router",
  version: "Latest",
  description: "Routes requests to the best available model.",
  releasedBy: "OpenRouter",
  contextWindow: 1000000,
  maxOutputTokens: 64000,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: false,
  supportsFineTuning: false,
  local: false,
  cloud: true,
  recommended: true,
  active: true,
  pricing: {},
  modalities: [
    "text",
    "image",
    "code",
  ],
  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,
  maxFileSizeMB: 1024,
  maxImages: 50,
  recommendedFor: [
    "general",
    "multimodal",
    "reasoning",
  ],
},

{
  id: "custom-model",
  name: "Custom Enterprise Model",
  providerId: "custom",
  family: "Custom",
  version: "1.0",
  description: "Custom enterprise AI model.",
  releasedBy: "Organization",
  contextWindow: 1000000,
  maxOutputTokens: 100000,
  supportsVision: true,
  supportsReasoning: true,
  supportsFunctionCalling: true,
  supportsStreaming: true,
  supportsEmbeddings: true,
  supportsFineTuning: true,
  local: true,
  cloud: true,
  recommended: true,
  active: true,
  pricing: {},
  modalities: [
    "text",
    "image",
    "audio",
    "video",
    "code",
  ],
  supportsJsonMode: true,
  supportsMCP: true,
  supportsToolChoice: true,
  supportsThinking: true,
  supportsWebSearch: true,
  supportsVisionOCR: true,
  supportsImageGeneration: true,
  supportsSpeechToText: true,
  supportsTextToSpeech: true,
  supportsRealtime: true,
  supportsRAG: true,
  supportsMultiAgent: true,
  supportsMemory: true,
  supportsAPI: true,
  maxFileSizeMB: 2048,
  maxImages: 100,
  recommendedFor: [
    "general",
    "reasoning",
    "coding",
    "finance",
    "security",
    "hr",
    "analytics",
    "vision",
    "multimodal",
  ],
},
];



