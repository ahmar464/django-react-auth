def set_user_role(strategy, details, backend, user=None, *args, **kwargs):
    """
    Custom pipeline to set default role for OAuth users
    """
    if user:
        # Only set role if this is a new user (is_created flag)
        is_new = kwargs.get('is_new', False)
        if is_new or not user.role:
            user.role = 'viewer'
            user.save()
        
        # Update user's name from OAuth provider if available
        if details.get('first_name') and not user.first_name:
            user.first_name = details.get('first_name', '')
        if details.get('last_name') and not user.last_name:
            user.last_name = details.get('last_name', '')
        user.save()
    
    return {'user': user}