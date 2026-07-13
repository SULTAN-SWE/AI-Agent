import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Bot,
  Sparkles,
  Send,
  Plus,
  MessageSquare,
  FileText,
  Shield,
  Briefcase,
  Search,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";


export default function AIAssistant() {

  const [message, setMessage] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

const generationTimeout =
  useRef<ReturnType<typeof setTimeout> | null>(null);

const messagesEndRef =
  useRef<HTMLDivElement>(null);

const [conversationMessages, setConversationMessages] =
  useState<
    Record<
      string,
      {
        role: "user" | "assistant";
        content: string;
      }[]
    >
  >({
    "HR Questions": [],
    "Finance Report": [],
    "IT Support": [],
    "Procurement": [],
    "Executive Summary": [],
  });

const { t } = useLanguage();

const [conversations, setConversations] = useState([
  "HR Questions",
  "Finance Report",
  "IT Support",
  "Procurement",
  "Executive Summary",
]);

const [activeConversation, setActiveConversation] =
  useState("HR Questions");

const [editingConversation, setEditingConversation] =
  useState<string | null>(null);

const [conversationTitle, setConversationTitle] =
  useState("");

const [conversationSearch, setConversationSearch] =
  useState("");

const regenerateResponse = (
  userPrompt: string
) => {

  setIsGenerating(true);

  setTimeout(() => {

    const regenerated = `Regenerated response for "${userPrompt}". This simulates a new AI answer and will later be replaced by the backend AI provider.`;

    setConversationMessages((current) => {

      const history = [
        ...(current[activeConversation] ?? []),
      ];

      history.pop();

      history.push({

        role: "assistant",

        content: regenerated,

      });

      return {

        ...current,

        [activeConversation]: history,

      };

    });

    setIsGenerating(false);

  }, 1500);

};

useEffect(() => {

  messagesEndRef.current?.scrollIntoView({

    behavior: "smooth",

  });

}, [
  conversationMessages,
  activeConversation,
  isGenerating,
]);

const handleDeleteConversation = (conversation: string) => {

  if (conversations.length === 1) return;

  const remaining = conversations.filter(
    (item) => item !== conversation
  );

  setConversations(remaining);

  setConversationMessages((current) => {

    const updated = { ...current };

    delete updated[conversation];

    return updated;

  });

  if (activeConversation === conversation) {

    setActiveConversation(remaining[0]);

  }

};

const prompts = [
  "Request annual leave",
  "Reset my password",
  "Generate finance report",
  "Create procurement request",
  "Summarize company policy",
  "Create employee onboarding",
];


  const handleNewChat = () => {

  const newChat = `New Chat ${conversations.length + 1}`;

  setConversations((current) => [
    newChat,
    ...current,
  ]);

  setConversationMessages((current) => ({

    ...current,

    [newChat]: [],

  }));

  setActiveConversation(newChat);

  setMessage("");

};

  const handleSend = () => {

  if (!message.trim() || isGenerating) return;

  const userMessage = message.trim();

  let conversationKey = activeConversation;

  if (activeConversation.startsWith("New Chat")) {

    conversationKey =
      userMessage.length > 30
        ? userMessage.substring(0, 30) + "..."
        : userMessage;

    setConversations((current) =>
      current.map((conversation) =>
        conversation === activeConversation
          ? conversationKey
          : conversation
      )
    );

    setConversationMessages((current) => ({

      ...current,

      [conversationKey]:
        current[activeConversation] ?? [],

    }));

    setActiveConversation(conversationKey);

  }

  setConversationMessages((current) => ({

    ...current,

    [conversationKey]: [

      ...(current[conversationKey] ?? []),

      {

        role: "user",

        content: userMessage,

      },

    ],

  }));

  setMessage("");

  setIsGenerating(true);

    generationTimeout.current = setTimeout(() => {

  let response = "";

  switch (userMessage.toLowerCase()) {

    case "request annual leave":

      response =
        "To request annual leave, open the HR Workspace, choose 'Leave Request', select your dates, and submit the request for manager approval.";

      break;

    case "reset my password":

      response =
        "You can reset your password from Settings → Security. If you cannot sign in, contact your IT administrator.";

      break;

    case "generate finance report":

      response =
        "The finance report has been prepared. You can review revenue, expenses, department costs, and monthly trends from the Reports module.";

      break;

    case "create procurement request":

      response =
        "A procurement request can be created from the Procurement workspace. Complete the request details and submit it for approval.";

      break;

    case "summarize company policy":

      response =
        "The company policy emphasizes security, compliance, collaboration, and responsible AI usage across all departments.";

      break;

    case "create employee onboarding":

      response =
        "The onboarding workflow includes account creation, department assignment, equipment allocation, mandatory training, and manager approval.";

      break;

    default:

      response =
        `I understand your request: "${userMessage}". This is a simulated enterprise AI response. Backend AI integration will replace this demo response later.`;

  }

  setConversationMessages((current) => ({

    ...current,

    [conversationKey]: [

      ...(current[conversationKey] ?? []),

      {

        role: "assistant",

        content: response,

      },

    ],

  }));

  setIsGenerating(false);

  generationTimeout.current = null;

}, 1500);

};

const handleStopGenerating = () => {

  if (generationTimeout.current) {

    clearTimeout(generationTimeout.current);

    generationTimeout.current = null;

  }

  setIsGenerating(false);

};

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-500">

      {/* Left Sidebar */}

      <Card className="col-span-3 border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-5 flex flex-col h-full">

          <Button
  onClick={handleNewChat}
  className="w-full mb-5 gap-2"
>
  <Plus className="w-4 h-4" />
  {t.NewChat}
</Button>

<h3 className="text-sm font-semibold mb-4">
  {t.ConversationHistory}
</h3>

<Input
  value={conversationSearch}
  onChange={(e) =>
    setConversationSearch(e.target.value)
  }
  placeholder={t.SearchConversations}
  className="mb-4"
/>

<div className="space-y-2 flex-1">

  {conversations
  .filter((item) =>
    item
      .toLowerCase()
      .includes(
        conversationSearch.toLowerCase()
      )
  )
  .map((item) => (

    <div
      key={item}
      className={`group flex items-center justify-between rounded-lg p-3 transition-colors ${
        activeConversation === item
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
      }`}
    >

      <button
        onClick={() => setActiveConversation(item)}
        className="flex flex-1 items-center gap-3 text-left"
      >

        <MessageSquare
          className={`h-4 w-4 ${
            activeConversation === item
              ? "text-primary-foreground"
              : "text-primary"
          }`}
        />

        {editingConversation === item ? (

  <Input
    autoFocus
    value={conversationTitle}
    onChange={(e) =>
      setConversationTitle(e.target.value)
    }
    onBlur={() => {

      if (conversationTitle.trim()) {

        setConversations((current) =>
          current.map((conversation) =>
            conversation === item
              ? conversationTitle
              : conversation
          )
        );

        setConversationMessages((current) => {

          const updated = { ...current };

          updated[conversationTitle] =
            updated[item];

          delete updated[item];

          return updated;

        });

        if (activeConversation === item) {

          setActiveConversation(
            conversationTitle
          );

        }

      }

      setEditingConversation(null);

    }}
    onKeyDown={(e) => {

      if (e.key === "Enter") {

        (
          e.target as HTMLInputElement
        ).blur();

      }

    }}
    className="h-7 text-sm"
  />

) : (

  <span
    className="truncate text-sm"
    onDoubleClick={() => {

      setEditingConversation(item);

      setConversationTitle(item);

    }}
  >

    {item}

  </span>

)}

      </button>

      <button
        onClick={() =>
          handleDeleteConversation(item)
        }
        className={`rounded p-1 transition-opacity ${
          activeConversation === item
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
        title="Delete conversation"
      >

        ✕
      </button>

    </div>

  ))}

</div>

        </CardContent>
      </Card>

      {/* Main Chat */}

      <Card className="col-span-9 border-border/50 bg-card/50 backdrop-blur flex flex-col">

        <CardContent className="p-6 flex flex-col h-full">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

              <Bot className="w-6 h-6 text-primary" />

            </div>

            <div>

              <h2 className="font-bold text-xl">
                {t.AIAssistant}
              </h2>

              <p className="text-muted-foreground text-sm">
                {t.AIAssistantDescription}
              </p>

            </div>

          </div>

          <div className="flex-1 overflow-y-auto">

  {(conversationMessages[activeConversation] ?? []).length === 0 ? (

    <>

      {/* Welcome */}

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-6">

        <div className="flex items-center gap-2 mb-3">

          <Sparkles className="w-5 h-5 text-primary" />

          <h3 className="font-semibold">

            {t.WhatCanIHelp}

          </h3>

        </div>

        <p className="text-muted-foreground">

          {t.AIAssistantWelcome}

        </p>

      </div>

      {/* Suggested Prompts */}

      <div>

        <h3 className="font-semibold mb-4">

          {t.SuggestedActions}

        </h3>

        <div className="grid grid-cols-2 gap-4">

          {prompts.map((prompt) => (

            <button
              key={prompt}
              onClick={() => setMessage(prompt)}
              className="rounded-xl border border-border p-4 text-left hover:border-primary hover:bg-primary/5 transition-all"
            >

              <div className="flex items-center gap-3">

                <Search className="w-4 h-4 text-primary" />

                <span>{prompt}</span>

              </div>

            </button>

          ))}

        </div>

      </div>

    </>

  ) : (

    <div className="space-y-5">

      {(conversationMessages[activeConversation] ?? []).map(
        (item, index) => (

        <div
          key={index}
          className={`flex ${
            item.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
  className={`max-w-[80%] rounded-xl px-4 py-3 ${
    item.role === "user"
      ? "bg-primary text-primary-foreground"
      : "border border-border bg-card"
  }`}
>

  <p>

    {item.content}

  </p>

  {item.role === "assistant" && (

  <div className="mt-3 flex justify-end gap-4">

    <button
      onClick={() =>
        navigator.clipboard.writeText(
          item.content
        )
      }
      className="text-xs text-primary hover:underline"
    >

      {t.Copy}

    </button>

    <button
      onClick={() => {

        const history =
          conversationMessages[
            activeConversation
          ] ?? [];

        const previousUser =
          history[index - 1];

        if (
          previousUser &&
          previousUser.role === "user"
        ) {

          regenerateResponse(
            previousUser.content
          );

        }

      }}
      className="text-xs text-primary hover:underline"
    >

      {t.Regenerate}

    </button>

  </div>

)}

  

</div>

        </div>

      ))}

      {isGenerating && (

  <div className="flex justify-start">

    <div className="rounded-xl border border-border bg-card px-4 py-3">

      <Bot className="mb-2 h-4 w-4 text-primary" />

      <span className="text-muted-foreground">

        {t.GeneratingResponse}

      </span>

    </div>

  </div>

)}

<div ref={messagesEndRef} />


    </div>

  )}

</div>

          {/* Chat Input */}

<div className="mt-6 flex gap-3">

  <Input
    value={message}
    disabled={isGenerating}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {

      if (e.key === "Enter") {

        handleSend();

      }

    }}
    placeholder={t.AskAssistantPlaceholder}
  />
  
  {isGenerating ? (

  <Button
    onClick={handleStopGenerating}
    variant="destructive"
    className="gap-2"
  >

    Stop

  </Button>

) : (

  <Button
    onClick={handleSend}
    disabled={!message.trim()}
    className="gap-2"
  >

    <Send className="w-4 h-4" />

    {t.Send}

  </Button>

)}

</div>

        </CardContent>

      </Card>

    </div>
  );
}