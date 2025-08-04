import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Building, Calendar, User, Trash2, AlertTriangle, Shield, ShieldOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  message: string;
  blocked?: boolean;
  createdAt: string;
}

export default function AdminContacts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: contacts, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact'],
  });

  const blockMutation = useMutation({
    mutationFn: async ({ contactId, blocked }: { contactId: number; blocked: boolean }) => {
      const response = await fetch(`/api/contact/${contactId}/block`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blocked }),
      });
      if (!response.ok) {
        throw new Error('Failed to update contact status');
      }
      return response.json();
    },
    onSuccess: (_, { blocked }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: blocked ? "Contact Blocked" : "Contact Unblocked",
        description: blocked 
          ? "This contact has been blocked and marked as spam." 
          : "This contact has been unblocked.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update contact status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (contactId: number) => {
      const response = await fetch(`/api/contact/${contactId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: "Contact Deleted",
        description: "The contact submission has been permanently removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: "Unable to delete the contact. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Loading Contact Submissions...</h1>
        </div>
      </div>
    );
  }

  const sortedContacts = contacts?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Contact Submissions</h1>
          <p className="text-gray-600">Total submissions: {contacts?.length || 0}</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Email notifications are now being sent to aprilv120@gmail.com for reliable delivery. 
              All submissions are safely stored here. Check for job opportunities from Sarah Johnson and John Smith!
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {sortedContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">{contact.name}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {contact.email}
                          </a>
                        </div>
                        {contact.company && (
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            <span>{contact.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(contact.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      #{contact.id}
                    </Badge>
                    {contact.blocked && (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Blocked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <a
                    href={`mailto:${contact.email}?subject=Re: Your inquiry about assistant project management roles`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Reply via Email
                  </a>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => blockMutation.mutate({ contactId: contact.id, blocked: !contact.blocked })}
                    disabled={blockMutation.isPending}
                    className={contact.blocked 
                      ? "text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300" 
                      : "text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                    }
                  >
                    {contact.blocked ? (
                      <>
                        <ShieldOff className="h-4 w-4 mr-1" />
                        Unblock
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-1" />
                        Block Spam
                      </>
                    )}
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          Delete Contact Submission
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to permanently delete this contact from <strong>{contact.name}</strong>?
                          <br /><br />
                          <span className="text-red-600 font-medium">This action cannot be undone.</span> The contact information and message will be permanently removed from your database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(contact.id)}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete Contact"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No contact submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}