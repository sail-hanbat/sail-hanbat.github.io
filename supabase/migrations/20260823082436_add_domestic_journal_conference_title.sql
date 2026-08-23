update public.site_pages
set content = jsonb_set(content, '{journalConferenceSectionTitle}', to_jsonb('Journal & Conference'::text), true)
where page_key = 'publications-domestic'
  and not (content ? 'journalConferenceSectionTitle');
