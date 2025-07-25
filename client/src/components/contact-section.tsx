import { useState } from "react";
import { Mail, MapPin, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  captchaAnswer: string;
}

interface CaptchaChallenge {
  question: string;
  answer: number;
}

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    captchaAnswer: "",
  });

  // Generate a simple math CAPTCHA
  const generateCaptcha = (): CaptchaChallenge => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question: string;
    let answer: number;
    
    switch (operation) {
      case '+':
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
        break;
      case '-':
        // Ensure positive result
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        question = `${larger} - ${smaller}`;
        answer = larger - smaller;
        break;
      case '×':
        // Use smaller numbers for multiplication
        const smallNum1 = Math.floor(Math.random() * 5) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        question = `${smallNum1} × ${smallNum2}`;
        answer = smallNum1 * smallNum2;
        break;
      default:
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
    }
    
    return { question, answer };
  };

  const [captcha, setCaptcha] = useState<CaptchaChallenge>(generateCaptcha());

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Include CAPTCHA verification in the request
      const requestData = {
        ...data,
        captchaAnswer: parseInt(data.captchaAnswer),
        captchaExpected: captcha.answer
      };
      const response = await apiRequest("POST", "/api/contact", requestData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", company: "", message: "", captchaAnswer: "" });
      setCaptcha(generateCaptcha()); // Generate new CAPTCHA
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again or contact me directly.",
        variant: "destructive",
      });
      // Generate new CAPTCHA on error
      setCaptcha(generateCaptcha());
      setFormData(prev => ({ ...prev, captchaAnswer: "" }));
    },
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate CAPTCHA
    if (!formData.captchaAnswer) {
      toast({
        title: "Please solve the math problem",
        description: "CAPTCHA verification is required to prevent spam.",
        variant: "destructive",
      });
      return;
    }
    
    const userAnswer = parseInt(formData.captchaAnswer);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      toast({
        title: "Incorrect answer",
        description: "Please solve the math problem correctly.",
        variant: "destructive",
      });
      setCaptcha(generateCaptcha()); // Generate new CAPTCHA
      setFormData(prev => ({ ...prev, captchaAnswer: "" }));
      return;
    }
    
    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Contact",
      value: "Use the secure contact form",
      link: null,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bremerton, Washington",
      link: null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/aprilsykes",
      link: "https://www.linkedin.com/in/aprilsykes",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/AprilV",
      link: "https://github.com/AprilV",
    },
  ];

  const professionalStatus = [
    "Available for Assistant PM roles",
    "Open to internship opportunities",
    "Seeking technical project coordinator positions",
  ];

  return (
    <section id="contact" className="py-12 bg-background-alt" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="section-header">
              Let's Connect
              <div className="section-underline"></div>
            </h2>
          </div>
          <p className="text-xl text-gray-600 mt-6">Ready to bring technical expertise and project management skills to your team</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center hover-lift">
                      <info.icon className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{info.label}</p>
                      {info.link ? (
                        <a 
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:text-primary-blue/80 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Professional Status */}
            <div className="professional-card p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Professional Status</h4>
              <div className="space-y-3">
                {professionalStatus.map((status, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-teal-blue' : 
                      index === 1 ? 'bg-primary-blue' : 'bg-primary-blue'
                    }`}></div>
                    <span className="text-gray-700">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="professional-card p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your name"
                    className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary-blue/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@company.com"
                    className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary-blue/20"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell me about the opportunity or project you'd like to discuss..."
                  className="w-full resize-none transition-all duration-200 focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>
              
              {/* CAPTCHA Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-2">
                  Security Verification *
                </label>
                <div className="flex items-center gap-4">
                  <div className="bg-white px-4 py-2 rounded border border-gray-300 font-mono text-lg">
                    {captcha.question} = ?
                  </div>
                  <Input
                    id="captcha"
                    type="number"
                    required
                    value={formData.captchaAnswer}
                    onChange={(e) => handleInputChange("captchaAnswer", e.target.value)}
                    placeholder="Answer"
                    className="w-24 text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCaptcha(generateCaptcha());
                      setFormData(prev => ({ ...prev, captchaAnswer: "" }));
                    }}
                    className="text-xs"
                  >
                    New Problem
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Please solve this simple math problem to verify you're human and prevent spam.
                </p>
              </div>
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-primary-blue text-white hover:bg-primary-blue/90 py-3 hover-lift hover-glow-primary transition-all duration-300"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-sm text-gray-600 text-center">
                I typically respond within 24 hours. Looking forward to connecting!
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
