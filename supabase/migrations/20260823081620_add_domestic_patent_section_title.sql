update public.site_pages
set content = jsonb_set(content, '{patentSectionTitle}', to_jsonb('Patent'::text), true)
where page_key = 'publications-domestic'
  and not (content ? 'patentSectionTitle');
