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
}

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "april_sykes@proton.me",
      link: "mailto:april_sykes@proton.me",
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
