UPDATE clicks
SET referrer_source = 'bing'
WHERE referrer_source = 'google'
  AND referer ~* '^https?://([^/?#]*\.)?bing\.com([:/?#]|$)';
