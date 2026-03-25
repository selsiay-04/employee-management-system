- Fix overly permissive notification insert policy
DROP POLICY "Authenticated can insert notifications" ON public.notifications;

-- Only allow inserting notifications for the current user OR if the user is an admin
CREATE POLICY "Users can insert own notifications" ON public.notifications 
  FOR INSERT TO authenticated 
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
