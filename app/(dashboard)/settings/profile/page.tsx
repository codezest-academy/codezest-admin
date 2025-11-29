"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User, Briefcase, Link2, Lock } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/primitives/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Skeleton } from "@/components/ui/primitives/skeleton";
import { ProfileGeneralForm } from "@/widgets/profile/profile-general-form";
import { ProfileProfessionalForm } from "@/widgets/profile/profile-professional-form";
import { ProfileSocialForm } from "@/widgets/profile/profile-social-form";
import { PasswordChangeForm } from "@/widgets/profile/password-change-form";
import type {
  ProfileGeneralData,
  ProfileProfessionalData,
  ProfileSocialData,
  PasswordChangeData,
} from "@/shared/lib/validations/profile-schema";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  profile: {
    bio: string | null;
    avatar: string | null;
    location: string | null;
    website: string | null;
    occupation: string | null;
    company: string | null;
    phone: string | null;
    address: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
  } | null;
}

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        toast.error("Failed to load profile");
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleGeneralSubmit(data: ProfileGeneralData) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...(profile?.profile || {}),
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        await fetchProfile();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleProfessionalSubmit(data: ProfileProfessionalData) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          email: profile?.email,
          ...data,
          ...(profile?.profile
            ? {
                bio: profile.profile.bio,
                avatar: profile.profile.avatar,
                location: profile.profile.location,
                website: profile.profile.website,
                githubUrl: profile.profile.githubUrl,
                linkedinUrl: profile.profile.linkedinUrl,
                twitterUrl: profile.profile.twitterUrl,
              }
            : {}),
        }),
      });

      if (response.ok) {
        toast.success("Professional info updated successfully!");
        await fetchProfile();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSocialSubmit(data: ProfileSocialData) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          email: profile?.email,
          ...data,
          ...(profile?.profile
            ? {
                bio: profile.profile.bio,
                avatar: profile.profile.avatar,
                location: profile.profile.location,
                occupation: profile.profile.occupation,
                company: profile.profile.company,
                phone: profile.profile.phone,
                address: profile.profile.address,
              }
            : {}),
        }),
      });

      if (response.ok) {
        toast.success("Social links updated successfully!");
        await fetchProfile();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePasswordSubmit(data: PasswordChangeData) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Password changed successfully!");
        // Reset form would happen in the component
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Failed to change password");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display text-neutral-950">
          Profile Settings
        </h1>
        <p className="text-neutral-500 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabbed Interface */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Professional</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Update your basic profile information and avatar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileGeneralForm
                initialData={{
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  email: profile.email,
                  bio: profile.profile?.bio || "",
                  avatar: profile.profile?.avatar || "",
                  location: profile.profile?.location || "",
                }}
                onSubmit={handleGeneralSubmit}
                isSubmitting={submitting}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Tab */}
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Update your work-related details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileProfessionalForm
                initialData={{
                  occupation: profile.profile?.occupation || "",
                  company: profile.profile?.company || "",
                  phone: profile.profile?.phone || "",
                  address: profile.profile?.address || "",
                }}
                onSubmit={handleProfessionalSubmit}
                isSubmitting={submitting}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Connect your social media profiles and website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileSocialForm
                initialData={{
                  website: profile.profile?.website || "",
                  githubUrl: profile.profile?.githubUrl || "",
                  linkedinUrl: profile.profile?.linkedinUrl || "",
                  twitterUrl: profile.profile?.twitterUrl || "",
                }}
                onSubmit={handleSocialSubmit}
                isSubmitting={submitting}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordChangeForm
                onSubmit={handlePasswordSubmit}
                isSubmitting={submitting}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
